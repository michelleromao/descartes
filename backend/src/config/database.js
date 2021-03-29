module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "admin",
  database: "Descartes",
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};