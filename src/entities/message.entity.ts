import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';

@Entity()
export class Message extends Model {
  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn()
  user!: User;
}