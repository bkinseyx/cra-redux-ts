/* eslint-disable */
/** Mock an api request to the server. Returns a Promise<string>.
 * Because we are just mocking, we don't actually use the formData.
 */
export const submitDemoFormApi = (formData: any) =>
  new Promise<string>((resolve, reject) => {
    setTimeout(
      () =>
        Math.random() < 0.5 // 50-50 chance of success
          ? resolve("The form was submitted successfully.")
          : reject(
              "The server returned an unspecified error. Please try again."
            ),
      1000
    );
  });
