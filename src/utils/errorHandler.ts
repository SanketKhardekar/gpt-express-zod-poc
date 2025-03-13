import { Response } from 'express';
export const handleError = (res: Response, error: any) => {
  console.error('Error:', error);
  res.status(500).json({
    status: 'error',
    message: error.message || 'Internal Server Error',
  });
};
