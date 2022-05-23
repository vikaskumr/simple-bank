import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  public account_id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    nullable: false,
  })
  public balance: number;

  @Column()
  public updated_at: Date;
}
