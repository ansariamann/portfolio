
import { NextPageContext } from 'next';

const Error = ({ statusCode }) => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </h1>
      <p>Sorry for the inconvenience.</p>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
