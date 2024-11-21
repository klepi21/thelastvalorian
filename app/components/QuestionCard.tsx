'use client'

import { Box, Button, Card, CardBody, Progress, Heading, VStack, Text } from '@chakra-ui/react'
import { ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

const MotionCard = chakra(motion.div)

interface QuestionCardProps {
  question: string
  options: Array<{ en: string; gr: string; score: any }>
  onAnswer: (score: any) => void
  progress: number
  language: "en" | "gr"
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
}

const optionVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 }
  })
}

export function QuestionCard({ question, options, onAnswer, progress, language }: QuestionCardProps) {
  return (
    <MotionCard
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      w="full"
      maxW={{ base: "100%", md: "2xl" }}
      mx="auto"
    >
      <Card
        bg="whiteAlpha.100"
        backdropFilter="blur(10px)"
        shadow="2xl"
        borderRadius="2xl"
        overflow="hidden"
        borderColor="whiteAlpha.200"
        borderWidth={1}
      >
        <CardBody p={{ base: 6, md: 8 }}>
          <Box mb={8} position="relative">
            <Progress 
              value={progress} 
              size="sm"
              colorScheme="blue" 
              borderRadius="full"
              bg="whiteAlpha.100"
              sx={{
                '& > div': {
                  background: 'linear-gradient(90deg, #4299E1 0%, #805AD5 100%)',
                }
              }}
            />
            <Text
              position="absolute"
              right="0"
              top="100%"
              mt={2}
              fontSize="sm"
              color="whiteAlpha.700"
            >
              {Math.round(progress)}%
            </Text>
          </Box>
          
          <Heading 
            as="h2" 
            size={{ base: "lg", md: "xl" }}
            mb={8}
            color="white"
            textAlign="center"
          >
            {question}
          </Heading>

          <VStack spacing={4} align="stretch">
            {options.map((option, index) => (
              <motion.div
                key={index}
                variants={optionVariants}
                initial="hidden"
                animate="visible"
                custom={index}
              >
                <Button
                  onClick={() => onAnswer(option.score)}
                  w="full"
                  py={6}
                  size="lg"
                  variant="outline"
                  justifyContent="space-between"
                  borderWidth={2}
                  _hover={{
                    transform: 'scale(1.02)',
                    bg: 'whiteAlpha.200',
                    borderColor: 'blue.400',
                  }}
                  transition="all 0.2s"
                  position="relative"
                  overflow="hidden"
                >
                  <Text fontSize={{ base: "md", md: "lg" }}>
                    {option[language]}
                  </Text>
                  <ArrowRight />
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={0}
                    bg="linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)"
                    transition="opacity 0.2s"
                    _groupHover={{ opacity: 1 }}
                  />
                </Button>
              </motion.div>
            ))}
          </VStack>
        </CardBody>
      </Card>
    </MotionCard>
  )
}