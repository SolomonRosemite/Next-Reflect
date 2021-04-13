import { Collections } from "../common/constants";
import { Entity, Column, BaseEntity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity(Collections.urls)
export class Urls extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  originalUrl: string;

  @Column("text", { unique: true })
  slogan: string;
}
