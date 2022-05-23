import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class AccountEntity {
  @PrimaryColumn()
  public accountId: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 4,
    default: 0.0,
    nullable: false,
    transformer: {
      to(value: any): any {
        return value;
      },
      from(value: any): any {
        return parseFloat(value);
      },
    },
  })
  public balance: number;

  @Column()
  public updatedAt: Date;
}
