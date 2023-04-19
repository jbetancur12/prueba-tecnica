import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import Model from './model.entity';
import { User } from './user.entity';
import { Message } from './message.entity';

@Entity()
export class Reaction extends Model {
  @Column()
  reaction: string;

  @ManyToOne(() => Message, (message) => message.reactions)
  @JoinColumn()
  message!: Message;

  @ManyToOne(() => User, (user) => user.reactions)
  @JoinColumn()
  user!: User;

}