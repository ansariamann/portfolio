/**
 * LeetCode API Integration
 * Fetches real-time data from LeetCode GraphQL API
 */

interface LeetCodeUserStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  acceptanceRate: number;
  ranking: number;
}

interface LeetCodeResponse {
  data: {
    matchedUser: {
      username: string;
      submitStats: {
        acSubmissionNum: Array<{
          difficulty: string;
          count: number;
        }>;
        totalSubmissionNum: Array<{
          difficulty: string;
          count: number;
        }>;
      };
      profile: {
        ranking: number;
        userAvatar: string;
        realName: string;
        aboutMe: string;
        school: string;
        websites: string[];
        countryName: string;
        company: string;
        jobTitle: string;
        skillTags: string[];
        postViewCount: number;
        postViewCountDiff: number;
        reputation: number;
        reputationDiff: number;
        solutionCount: number;
        solutionCountDiff: number;
        categoryDiscussCount: number;
        categoryDiscussCountDiff: number;
      };
    };
  };
}

/**
 * Fetches user statistics from LeetCode GraphQL API
 */
export async function fetchLeetCodeStats(
  username: string
): Promise<LeetCodeUserStats | null> {
  try {
    const query = `
      query getUserProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
            totalSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            userAvatar
            realName
            aboutMe
            school
            websites
            countryName
            company
            jobTitle
            skillTags
            postViewCount
            postViewCountDiff
            reputation
            reputationDiff
            solutionCount
            solutionCountDiff
            categoryDiscussCount
            categoryDiscussCountDiff
          }
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: LeetCodeResponse = await response.json();

    if (!data.data?.matchedUser) {
      throw new Error("User not found");
    }

    const user = data.data.matchedUser;
    const acStats = user.submitStats.acSubmissionNum;
    const totalStats = user.submitStats.totalSubmissionNum;

    // Parse difficulty stats
    const easySolved = acStats.find((s) => s.difficulty === "Easy")?.count || 0;
    const mediumSolved =
      acStats.find((s) => s.difficulty === "Medium")?.count || 0;
    const hardSolved = acStats.find((s) => s.difficulty === "Hard")?.count || 0;
    const totalSolved = easySolved + mediumSolved + hardSolved;

    const easyTotal =
      totalStats.find((s) => s.difficulty === "Easy")?.count || 0;
    const mediumTotal =
      totalStats.find((s) => s.difficulty === "Medium")?.count || 0;
    const hardTotal =
      totalStats.find((s) => s.difficulty === "Hard")?.count || 0;
    const totalSubmissions = easyTotal + mediumTotal + hardTotal;

    const acceptanceRate =
      totalSubmissions > 0 ? (totalSolved / totalSubmissions) * 100 : 0;

    return {
      totalSolved,
      totalQuestions: totalSolved, // LeetCode doesn't provide total questions in this API
      easySolved,
      mediumSolved,
      hardSolved,
      acceptanceRate: Math.round(acceptanceRate * 100) / 100,
      ranking: user.profile.ranking || 0,
    };
  } catch (error) {
    console.error("Error fetching LeetCode stats:", error);
    return null;
  }
}

/**
 * Fetches contest rating from LeetCode
 */
export async function fetchLeetCodeContestRating(
  username: string
): Promise<number | null> {
  try {
    const query = `
      query userContestRankingInfo($username: String!) {
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
      }
    `;

    const response = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data?.userContestRanking?.rating || null;
  } catch (error) {
    console.error("Error fetching LeetCode contest rating:", error);
    return null;
  }
}

/**
 * Cache management for API calls
 */
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const cache = new Map<string, { data: any; timestamp: number }>();

export async function getCachedLeetCodeStats(
  username: string
): Promise<LeetCodeUserStats | null> {
  const cacheKey = `leetcode-${username}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const stats = await fetchLeetCodeStats(username);
  if (stats) {
    cache.set(cacheKey, { data: stats, timestamp: Date.now() });
  }

  return stats;
}
