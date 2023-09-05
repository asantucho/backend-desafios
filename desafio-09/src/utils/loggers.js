import log4js from "log4js";

const logger = log4js.getLogger()

export const loggers = ()=> {
    log4js.configure({
        appenders: {
            fileAppender: {type: "file", filename: }
        }
    })
}