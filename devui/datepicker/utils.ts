const getDateTime = (d: Date) => {
    const year = d.getFullYear()
    const month = d.getMonth() + 1
    const date = d.getDate()
    const day = d.getDay()
    const hour = d.getHours()
    const minute = d.getMinutes()
    const second = d.getSeconds()
    const ms = d.getMilliseconds()
    return [year, month, date, day, hour, minute, second, ms]
}

const fixStart = (n: number, m: string, max = 2, ch = '0') => {
    return (n + '').padStart(Math.min(m.length, max), ch)
}

/**
 * - y: year yy 取后2位，其他情况取4位
 * - M: month 最多取2位补0
 * @param fmt 
 * @param d 
 */
export const formatDate = (fmt: string, d: Date) => {
    const usage = getDateTime(d)
    let res = fmt
    res = res.replace(/y+/g, m => {
        const year = usage[0] + ''
        if(m.length === 2) {
            return year.substring(2)
        }
        return year
    })
    res = res.replace(/M+/g, m => fixStart(usage[1], m))
    res = res.replace(/d+/g, m => fixStart(usage[2], m))
    res = res.replace(/h+/g, m => fixStart(usage[4], m))
    res = res.replace(/m+/g, m => fixStart(usage[5], m))
    res = res.replace(/s+/g, m => fixStart(usage[6], m))
    return res
}

export const formatRange = (fmt: string, a: Date, b: Date, conn = '-') => {
    return `${formatDate(fmt, a)} ${conn} ${formatDate(fmt, b)}`
}