import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import Model from './model.entity'
import { User } from './user.entity'
import { Comment } from './comment.entity'
import { Reaction } from './reaction.entity'

@Entity()
export class Message extends Model {
  @Column({
    unique: true
  })
  title: string

  @Column()
  content: string

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn()
  user!: User

  @OneToMany(() => Comment, (comment) => comment.message)
  comments: Comment[]

  @OneToMany(() => Reaction, (reaction) => reaction.message)
  reactions: Reaction[]
}
