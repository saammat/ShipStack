import { prisma } from './prisma';
import type { Visibility } from '@/prisma/client';
import { ChatSDKError } from '@/lib/errors';

/**
 * 根据 message.id 获取单条消息
 */
export function getMessageById(id: string) {
  return prisma.messageV2.findUnique({ where: { id } });
}

/**
 * 删除某个 chat 在指定时间之后的所有消息
 */
export function deleteMessagesByChatIdAfterTimestamp(
  chatId: string,
  timestamp: Date,
) {
  return prisma.messageV2.deleteMany({
    where: {
      chatId,
      createdAt: { gt: timestamp },
    },
  });
}

/**
 * 更新 Chat 的可见性（public/private）
 */
export function updateChatVisiblityById(
  chatId: string,
  visibility: Visibility, // 枚举类型，来自 schema 中的 enum Visibility
) {
  return prisma.chat.update({
    where: { id: chatId },
    data: { visibility },
  });
}

/**
 * 根据 documentId 获取所有建议（Suggestion）
 */
export async function getSuggestionsByDocumentId({documentId}: {documentId: string}) {
  try {
    return await prisma.suggestion.findMany({
      where: { documentId },
      // 如需按创建时间倒序，可加 orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    throw new ChatSDKError(
      'bad_request:database',
      'Failed to get suggestions by document id'
    );
  }
}

/**
 * 业务层：只做简单代理，方便以后插入权限校验 / 日志
 */
export async function updateChatVisibility({
  chatId,
  visibility,
}: {
  chatId: string;
  visibility: Visibility;        // 与 schema.enum Visibility 对应
}) {
  await updateChatVisiblityById(chatId, visibility );
}