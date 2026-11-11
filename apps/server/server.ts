import Fastify from 'fastify';
// import FastifyCors from '@fastify/cors';
import Mercurius from 'mercurius';
import { resolvers, schema } from './graphql/index.js';
import { isProd } from './config.js';

async function init() {
  const fastify = Fastify({ logger: { level: 'warn' } });

  /* await fastify.register(FastifyCors, {
    origin: ['https://your-frontend.com'],
    credentials: true,
  }); */

  await fastify.register(Mercurius, {
    schema,
    resolvers,
    graphiql: true,
    /* csrfPrevention: {
      allowedContentTypes: ['application/json'],
      requiredHeaders: ['Authorization'],
    }, */
  });

  try {
    await fastify.listen({ port: 3000 });
    if (!isProd) console.info(fastify.printRoutes());
  } catch (err) {
    fastify.log.error(err);
    throw err;
  }
  console.log('info', { msg: 'Server running on %s', uri: fastify.listeningOrigin });
}

process.on('unhandledRejection', (err) => {
  console.log(err);
  throw err;
});

init();
