/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Product from '../../../models/Product'

dbConnect()

export default async (req: { body?: any; query?: any; method?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any }): void; new(): any } } }) => {
  const {
    query: { id },
    method,
  } = req

  switch(method) {
    case 'GET':
      try {
        const product = await Product.findById(id);
        if(!product) {
          return res.status(400).json({success: false})
        }
        res.status(200).json({success: true, data: product})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break;
    case 'PUT': 
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if(!product) {
        return res.status(400).json({success: false})
      }
      res.status(200).json({success: true, data: product})
      } catch (error) {
      res.status(400).json({success: false})
      }
      break;
    case 'DELETE':
      try {
        const deletedProduct = await Product.deleteOne({ _id: id }); 
        if(!deletedProduct) {
          return res.status(400).json({success: false})
        }
        res.status(200).json({success: true, data: {}})
      } catch (error) {
        return res.status(400).json({success: false})
      }
      break
    default:
      res.status(400).json({success: false})
  }
}