import type { CityData } from '../types/city'
import rawData from './city-data.json'

export const cityData = rawData as unknown as CityData

export const profile = cityData.profile
export const districts = cityData.districts
export const flagshipProjects = cityData.flagshipProjects
export const experience = cityData.experience
export const careerTimeline = cityData.careerTimeline
export const education = cityData.education
export const skills = cityData.skills
export const skillTree = cityData.skillTree
export const universityDoors = cityData.universityDoors
export const academicRoles = cityData.academicRoles
export const timeline = cityData.timeline
export const publications = cityData.publications
export const certifications = cityData.certifications
export const labStations = cityData.labStations
export const sideProjects = cityData.sideProjects
export const bootSequence = cityData.bootSequence
