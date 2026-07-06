import type { SurveyConfig } from '../types/Survey'
import { branches } from './branches'
import { commonQuestions, universalQuestions } from './questions'

export const surveyConfig: SurveyConfig = {
  id: 'afrimoney-assessment-v3',
  title: 'Crypto Money Health Check for Ghana',
  universalQuestions,
  branches,
  commonQuestions,
}

/** App settings — links, researcher profile */
export const appConfig = {
  playbookUrl: '/ghanian-crypto-users-guide-paying-less-in-fees.pdf',
  whatsappCommunityUrl: 'https://chat.whatsapp.com/JGZt4EdAhDNKC30iHF8F9v',
  researcher: {
    name: 'Gyan Anthony Kwame Takyi',
    title: 'Community Researcher or Business / Growth Consultant',
    bio: 'I help people in Ghana navigate crypto money decisions with more clarity and less risk. This assessment and guide were created from real conversations with everyday crypto users.',
    profileImage: '/anthony-takyi.png',
    profileUrl: 'https://www.linkedin.com/in/anthony-takyi',
    profileLabel: 'Follow me on LinkedIn',
  },
}
