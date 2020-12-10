export default interface RawResponse {
  date: string;
  [key: string]: any;
}

export function isRawResponse(data: RawResponse): data is RawResponse {
  type RawResponseBaseKeys = keyof RawResponse;
  const mustHaveKeys = ['date'] as Array<RawResponseBaseKeys>;
  return data instanceof Object && mustHaveKeys.every((key) => data[key]);
}

export function isRawResponseArray(data: RawResponse[]): data is RawResponse[] {
  return (
    data instanceof Array && data.every((service) => isRawResponse(service))
  );
}
