  import { Comment } from '../entities/comment.entity';
import { Message } from '../entities/message.entity';
  import { User } from '../entities/user.entity';
  import { AppDataSource } from '../utils/data-source';
  
  const commentRepository = AppDataSource.getRepository(Comment);
  
  export const createComment = async (input: Partial<Comment>, user: User, message: Message) => {
    return await commentRepository.save(commentRepository.create({ ...input, user, message }));
  };

  export const findCommentById = async (commentId: string) => {
    return await commentRepository.findOneBy({ id: commentId });
  };
  

  
  