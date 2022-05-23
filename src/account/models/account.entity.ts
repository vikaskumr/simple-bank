import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class AccountEntity {
  @PrimaryColumn()
  public accountId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: false,
  })
  public balance: number;

  @Column()
  public updatedAt: Date;
}
