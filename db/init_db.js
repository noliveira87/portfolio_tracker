// Conectar ao banco de dados 'admin'
const adminDB = db.getSiblingDB('admin');

// Conectar ao banco de dados 'portfolio_db'
const portfolioDB = db.getSiblingDB('portfolio_db');

// Criar o usuário 'tracker_user' com permissões no banco de dados 'portfolio_db' se não existir
const portfolioUserExists = portfolioDB.getUser('tracker_user');
if (!portfolioUserExists) {
  portfolioDB.createUser({
    user: "tracker_user",
    pwd: "securepassword",
    roles: [{ role: "readWrite", db: "portfolio_db" }]
  });
}

portfolioDB.createCollection('investment_types');
portfolioDB.createCollection('savings');
portfolioDB.createCollection('investments');

// Inserir os tipos de investimento se não existirem
const investmentTypes = [
  { type_name: 'Aforro' },
  { type_name: 'ETFs' },
  { type_name: 'PPR' },
  { type_name: 'Plutus' },
  { type_name: 'Crypto' },
  { type_name: 'P2P' },
  { type_name: 'Bugibita' },
  { type_name: 'Others' }
];

investmentTypes.forEach(type => {
  portfolioDB.investment_types.updateOne(
    { type_name: type.type_name },
    { $setOnInsert: type },
    { upsert: true }
  );
});

// Inserir os investimentos com valores iniciais
const investmentTypesMap = {};
investmentTypes.forEach(type => {
  const result = portfolioDB.investment_types.findOne({ type_name: type.type_name });
  if (result) {
    investmentTypesMap[type.type_name] = result._id;
  }
});

const investments = [
  { 
    name: 'Investment A', 
    type_id: investmentTypesMap['Aforro'], 
    monthly_evolution: [{ month: new Date('2024-08-01'), value: 10000.00 }], 
    yearly_evolution: [{ year: 2024, value: 10000.00 }] 
  },
  { 
    name: 'Investment B', 
    type_id: investmentTypesMap['ETFs'], 
    monthly_evolution: [{ month: new Date('2024-08-01'), value: 10000.00 }], 
    yearly_evolution: [{ year: 2024, value: 10000.00 }] 
  }
];

investments.forEach(investment => {
  portfolioDB.investments.updateOne(
    { name: investment.name },
    { $setOnInsert: investment },
    { upsert: true }
  );
});
