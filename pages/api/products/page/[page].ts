/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../../utils/dbConnect';
import Product from '../../../../models/Product';
import { NextApiRequest, NextApiResponse } from 'next'


dbConnect();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req;
  const limit = query.limit || 9
  const startIdx = query.page * limit
  switch (method) {
    case 'GET':
      try {
        const products = await Product.find({}).skip(startIdx).limit(limit);

        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
};