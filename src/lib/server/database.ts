import { Sequelize, DataTypes, Model, type Optional } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'store/db.sqlite',
  logging: false,
});

class Category extends Model {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'category'
  }
);

class Location extends Model {
  declare id: number;
  declare name: string;
}

Location.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'location'
  }
);

class Asset extends Model {
  declare id: number;
  declare name: string;
  declare tag: string;
  declare description: string;
}

Asset.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'New Asset',
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      defaultValue: '',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
      allowNull: false
    },
    image: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize,
    modelName: 'asset'
  }
);

Asset.hasMany(Category);
Asset.hasOne(Location);

try {
  await sequelize.authenticate();
  console.log('Database Connected');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

try {
  await sequelize.sync({ force: true });
} catch (error) {
  console.error('Unable to sync database:', error);
}

export { sequelize, Asset, Category, Location };

