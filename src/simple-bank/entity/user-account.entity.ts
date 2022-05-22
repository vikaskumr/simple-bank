import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
class UserAccount {
  @PrimaryGeneratedColumn()
  public account_id: number;

  @Column()
  public balance: number;

  @Column()
  public updated_at: Date;
}

export default UserAccount;
