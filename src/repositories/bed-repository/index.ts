import { prisma } from '@/config';

async function findById(id: number) {
  return prisma.bed.findFirst({
    where: { id },
  });
}

const bedRepository = {
  findById,
};

export default bedRepository;
