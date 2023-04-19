import { Message } from '../entities/message.entity';
import { Reaction } from '../entities/reaction.entity';
import { User } from '../entities/user.entity';
import { AppDataSource } from '../utils/data-source';

const reactionRepository = AppDataSource.getRepository(Reaction);

export const createReaction = async (input: Partial<Reaction>, user: User, message: Message) => {
    return await reactionRepository.save(reactionRepository.create({ ...input, user, message }));
};



