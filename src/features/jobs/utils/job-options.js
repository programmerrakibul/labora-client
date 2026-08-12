import {
  EXPERIENCE_LEVEL,
  JOB_CATEGORIES,
  JOB_STATUS,
  JOB_TYPE,
  WORK_LOCATION_TYPE,
} from "@/constants/enums";

export const jobFormOptions = {
  jobTypes: Object.values(JOB_TYPE),
  locationTypes: Object.values(WORK_LOCATION_TYPE),
  experienceLevels: Object.values(EXPERIENCE_LEVEL),
  statuses: Object.values(JOB_STATUS),
  categories: JOB_CATEGORIES.map((c) => ({
    label: c,
    value: c,
  })),
};
