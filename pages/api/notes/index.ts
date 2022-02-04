/* eslint-disable import/no-anonymous-default-export */
import dbConnect from '../../../utils/dbConnect'
import Note from '../../../models/Notes'

dbConnect()

export default async (req: { body?: any; method?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { success: boolean; data?: any }): void; new(): any } } }) => {
  const { method } = req

  switch(method) {
    case 'GET':
      try{
        const notes = await Note.find({})

        res.status(200).json({success: true, data: notes})
      } catch (error) {
        res.status(400).json({success: false})
      }
      break;
    case 'POST':
      try { 
        const note = await Note.create(req.body)
        res.status(201).json({success: true, data: note})
      } catch(error) {
        res.status(400).json({success: false})
      }
      break;
    default: 
    res.status(400).json({success: false})
  }
} 