module.exports = {
  apps: [
    {
      name: "sakuraschoolsimulator",
      cwd: "/home/sakuraschoolsimulator/htdocs/sakuraschoolsimulator.net",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
      instances: 1,
      autorestart: true,
      max_memory_restart: "512M",
    },
  ],
};
