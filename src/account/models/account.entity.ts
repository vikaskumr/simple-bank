import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class AccountEntity {
  @PrimaryGeneratedColumn()
  public account_id: number;

  @Column()
  public balance: number;

  @Column()
  public updated_at: Date;
}
