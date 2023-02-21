import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  DataTypes,
  Model,
} from "sequelize";
import { sequelize } from "../database";
import { CandidateInstance } from "./candidate";

interface JobInstace extends Model {
  id: number;
  title: string;
  description: string;
  limitDate: Date;
  companyId: number;
  addCandidate: BelongsToManyAddAssociationMixin<CandidateInstance, number>;
  removeCandidate: BelongsToManyRemoveAssociationMixin<
    CandidateInstance,
    number
  >;
  countCandidates: BelongsToManyCountAssociationsMixin;
}

export const Job = sequelize.define<JobInstace>("jobs", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  limitDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "companies",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "RESTRICT",
  },
});
