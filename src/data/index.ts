import type { CityData } from '../types/city'
import rawData from './city-data.json'

export const cityData = rawData as unknown as CityData

export const profile = cityData.profile
export const flagshipProjects = cityData.flagshipProjects
export const otherGithubProjects = cityData.otherGithubProjects
export const experience = cityData.experience
export const careerTimeline = cityData.careerTimeline
export const education = cityData.education
export const skills = cityData.skills
export const academicRoles = cityData.academicRoles
export const publications = cityData.publications
export const certifications = cityData.certifications
