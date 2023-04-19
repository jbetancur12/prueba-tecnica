import {
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere
} from 'typeorm'
import { Message } from '../entities/message.entity'
import { User } from '../entities/user.entity'
import { AppDataSource } from '../utils/data-source'

const messageRepository = AppDataSource.getRepository(Message)

export const createMessage = async (input: Partial<Message>, user: User) => {
  return await messageRepository.save(
    messageRepository.create({ ...input, user })
  )
}

export const getMessage = async (messageId: string) => {
  return await messageRepository.findOneBy({ id: messageId })
}

export const findMessageById = async (messageId: string) => {
  return await messageRepository.findOneBy({ id: messageId })
}

export const findMessages = async (
  where: FindOptionsWhere<Message> = {},
  select: FindOptionsSelect<Message> = {},
  relations: FindOptionsRelations<Message> = {}
) => {
  return await messageRepository.find({
    where,
    select,
    relations
  })
}
