import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import Model from './model.entity'
import { Message } from './message.entity'
import { User } from './user.entity'

@Entity()
export class Comment extends Model {
  @Column()
  content: string

  @ManyToOne(() => Message, (message) => message.comments)
  @JoinColumn()
  message!: Message

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn()
  user!: User
}
