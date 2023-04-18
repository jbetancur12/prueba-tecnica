import { Entity, Column, Index, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import Model from './model.entity';
import { Message } from './message.entity';

@Entity()
export class User extends Model {

    @Column()
    username: string

    @Index('email_index')
    @Column({
      unique: true,
    })
    email: string;

    @Column()
    password: string;

    @Column()
    fullname: string

    @OneToMany(() => Message, (message) => message.user)
    messages: Message[];

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 12);
    }

    static async comparePasswords(
        candidatePassword: string,
        hashedPassword: string
      ) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
      }

      toJSON() {
        return {
          ...this,
          password: undefined
        };
      }

}