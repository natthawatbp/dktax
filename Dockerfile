# Pin the Node.js major; bump deliberately. Runs as the unprivileged "node" user.
FROM node:22-alpine

ENV NODE_ENV=production \
    PORT=8080

WORKDIR /app
COPY --chown=root:root package.json server.js /app/
COPY --chown=root:root public /app/public

USER node
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD ["node", "-e", "require('http').get('http://127.0.0.1:'+(process.env.PORT||8080)+'/',r=>process.exit(r.statusCode===200?0:1)).on('error',()=>process.exit(1))"]

CMD ["node", "server.js"]
