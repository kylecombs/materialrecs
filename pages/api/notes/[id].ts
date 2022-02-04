/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Notes'

dbConnect()

export default async (req: { body?: any; query?: any; method?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any }): void; new(): any } } }) => {
  const {
    query: { id },
    method,
  } = req

  switch(method) {
    case 'GET':
      try {
        const note = await Note.findById(id);
        if(!note) {
          return res.status(400).json({success: false})
        }
        res.status(200).json({success: true, data: note})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break;
    case 'PUT': 
    try {
      const note = await Note.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if(!note) {
        return res.status(400).json({success: false})
      }
      res.status(200).json({success: true, data: note})
      } catch (error) {
      res.status(400).json({success: false})
      }
      break;
    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id }); 
        if(!deletedNote) {
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