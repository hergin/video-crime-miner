/* Required Express imports */
import { Request, Response, NextFunction } from 'express'

/* Backend layer imports */
import { upload, listObjects, getObjectFromS3, uploadWithFile} from '../../AWS Layer/s3Connector.js'
import { createNewFileRow } from '../../postgres/db.files.js'
import { Readable } from 'stream'

const bucket = process.env["REKOG_BUCKET_NAME"] || "REKOG BUCKET NAME NOT DEFINED"

/* GET all files in S3 Bucket */
async function fetchAllFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = await listObjects(bucket)
      return res.status(200).json(files)
    } catch (err) {
      console.log("app.get('/files') errored out")
      res.status(500).send(err)
    }
}

/* GET file in S3 Bucket by File Name */
async function fetchFileByName(req: any, res: Response, next: NextFunction) {
    try {
		var result = await getObjectFromS3(bucket , req.params.file)

		if(result instanceof Readable) {
      	result.pipe(res)
	}
		return res.status(200)
	} catch (err) {
		res.status(500).send(err)
	}
}

/* POST a new file */
async function createAndUploadFile(req: any, res: any, next: NextFunction) {
    
	try {
        var result= await uploadWithFile(bucket, req.files.file.data , req.files.file.name)
        const dbresult = await createNewFileRow(req.body.file.name, "", 4)
        console.log({s3: result, db: dbresult})
        return res.status(200).json({
          result
        })
      } catch (err:any) {
        console.log("app.post('/upload') We have errored out")
        res.status(500).send({
          errormsg: err.message,
          params: req.params,
          query: req.query,
        })
      }
}

export { fetchAllFiles, fetchFileByName, createAndUploadFile }