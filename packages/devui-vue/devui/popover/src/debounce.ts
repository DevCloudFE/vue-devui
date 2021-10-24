export default ( callBack,wait: number) => {
    let time = null
    return () => {
        time && clearTimeout(time);
        time = setTimeout(() => {
            callBack?.()
        }, wait)
    }
}