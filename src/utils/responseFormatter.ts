export const formatResponse = (response: any) => {
    return {
      status: 'success',
      data: response,
      timestamp: new Date().toISOString(),
    };
  };