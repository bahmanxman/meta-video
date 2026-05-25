export type AdminEventFormFieldIds = {
  titleId: string;
  matchId: string;
  priceId: string;
  eventTypeId: string;
  descriptionId: string;
  timestampId: string;
  videoFileId: string;
  eventsListId: string;
  headingId: string;
  eventsHeadingId: string;
};

export function createAdminEventFormFieldIds(
  formId: string,
): AdminEventFormFieldIds {
  return {
    titleId: `${formId}-asset-title`,
    matchId: `${formId}-match-name`,
    priceId: `${formId}-price`,
    eventTypeId: `${formId}-event-type`,
    descriptionId: `${formId}-description`,
    timestampId: `${formId}-timestamp`,
    videoFileId: `${formId}-video-file`,
    eventsListId: `${formId}-events-list`,
    headingId: `${formId}-heading`,
    eventsHeadingId: `${formId}-events-heading`,
  };
}
