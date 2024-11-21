'use client'

import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  VStack, 
  Text, 
  Icon, 
  Heading,
  Image
} from '@chakra-ui/react'
import { AlertTriangle, ArrowRight, Wallet } from 'lucide-react'
import { motion, type Variants } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

const MotionBox = chakra(motion.div)

interface Token {
  tokenIdentifier: string
  weight: number
}

interface ResultCardProps {
  bundle: {
    name: string
    description: { en: string; gr: string }
    tokens: Token[]
    longDescription?: { en: string; gr: string }
  }
  onRestart: () => void
  language: "en" | "gr"
}

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  }
}

const iconVariants: Variants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: { type: "spring", duration: 0.6 }
  }
}

const tokenVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1 }
  })
}

export function ResultCard({ bundle, onRestart, language }: ResultCardProps) {
  const getTokenName = (identifier: string) => identifier.split('-')[0]
  const getTokenImageUrl = (identifier: string) => 
    `https://raw.githubusercontent.com/ElrondNetwork/assets/master/tokens/${identifier}/logo.png`

  return (
    <MotionBox
      variants={containerVariants}
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
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <MotionBox
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                mb={6}
                mx="auto"
                w={20}
                h={20}
                borderRadius="full"
                bg="linear-gradient(135deg, #4299E1 0%, #805AD5 100%)"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Icon as={Wallet} w={10} h={10} color="white" />
              </MotionBox>

              <Heading
                as="h2"
                size="lg"
                mb={2}
                bgGradient="linear(to-r, blue.400, purple.400)"
                bgClip="text"
              >
                {language === "gr" ? "Η Πρότασή μας" : "Our Recommendation"}
              </Heading>

              <Heading
                as="h3"
                size="xl"
                mb={3}
                color="blue.400"
              >
                {bundle.name}
              </Heading>

              <Text
                fontSize="lg"
                color="whiteAlpha.900"
                mb={6}
              >
                {bundle.description[language]}
              </Text>

              <Box
                bg="whiteAlpha.100"
                p={6}
                borderRadius="xl"
                mb={8}
              >
                <Text color="whiteAlpha.900">
                  {bundle.longDescription?.[language]}
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading
                as="h4"
                size="md"
                mb={4}
                color="whiteAlpha.900"
              >
                {language === "gr" ? "Σύνθεση Χαρτοφυλακίου" : "Portfolio Composition"}
              </Heading>

              <VStack spacing={3}>
                {bundle.tokens.map((token, index) => (
                  <MotionBox
                    key={token.tokenIdentifier}
                    variants={tokenVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    w="full"
                  >
                    <Box
                      p={4}
                      borderRadius="lg"
                      bg="whiteAlpha.100"
                      _hover={{ bg: "whiteAlpha.200" }}
                      transition="all 0.2s"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center" gap={3}>
                        <Box
                          w={10}
                          h={10}
                          borderRadius="full"
                          bg="white"
                          p={1}
                          position="relative"
                        >
                          <Image
                            src={getTokenImageUrl(token.tokenIdentifier)}
                            alt={getTokenName(token.tokenIdentifier)}
                            borderRadius="full"
                          />
                        </Box>
                        <Text color="whiteAlpha.900" fontWeight="medium">
                          {getTokenName(token.tokenIdentifier)}
                        </Text>
                      </Box>
                      <Text color="whiteAlpha.800" fontWeight="medium">
                        {token.weight}%
                      </Text>
                    </Box>
                  </MotionBox>
                ))}
              </VStack>
            </Box>

            <Box
              bg="orange.900"
              p={6}
              borderRadius="xl"
              borderWidth={1}
              borderColor="orange.500"
            >
              <VStack spacing={3}>
                <Icon as={AlertTriangle} color="orange.300" boxSize={6} />
                <Text color="orange.100" textAlign="center">
                  {language === "gr" 
                    ? "Αυτό δεν αποτελεί οικονομική συμβουλή. Παρακαλώ κάντε τη δική σας έρευνα πριν επενδύσετε."
                    : "This is not financial advice. Please do your own research before investing."}
                </Text>
              </VStack>
            </Box>

            <Box
              bg="blue.900"
              p={6}
              borderRadius="xl"
              borderWidth={1}
              borderColor="blue.500"
            >
              <Text color="blue.100" textAlign="center" fontSize="lg">
                {language === "gr" 
                  ? "Όλα αυτά τα χαρτοφυλάκια είναι διαθέσιμα στο valoro.fund. Μπορείτε εύκολα να δημιουργήσετε το πρώτο σας πορτφόλιο χρησιμοποιώντας απλά το Gmail σας. Αγοράστε κρύπτο και επενδύστε σε έτοιμα πακέτα με ευκολία!"
                  : "All these portfolios are available at valoro.fund. You can easily create your first portfolio using just your Gmail. Buy crypto and invest in ready-made packages with ease!"}
              </Text>
            </Box>

            <VStack spacing={4}>
              <Button
                size="lg"
                w="full"
                bgGradient="linear(to-r, blue.600, purple.600)"
                _hover={{
                  bgGradient: "linear(to-r, blue.700, purple.700)",
                  transform: "scale(1.02)"
                }}
                onClick={() => window.open("https://valoro.fund/onboarding/", "_blank")}
                leftIcon={<Icon as={Wallet} />}
                rightIcon={<Icon as={ArrowRight} />}
              >
                {language === "gr" ? "Ξεκινήστε την Επένδυση" : "Start Investing"}
              </Button>

              <Button
                size="lg"
                w="full"
                variant="outline"
                onClick={onRestart}
                _hover={{
                  bg: 'whiteAlpha.200',
                  borderColor: 'blue.400'
                }}
              >
                {language === "gr" ? "Ξεκινήστε Ξανά" : "Start Over"}
              </Button>
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    </MotionBox>
  )
}