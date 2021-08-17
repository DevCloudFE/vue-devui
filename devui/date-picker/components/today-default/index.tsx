const TodayDefault = (props: { onSelected?: (date: Date) => void; }) => {
    const { onSelected = () => 0 } = props
    return (
        <button style={{
            border: '1px solid #06c',
            borderRadius: '3px',
            padding: '2px 20px',
            fontSize: '12px',
        }} onClick={() => onSelected(new Date())}>今天</button>
    )
}

export default TodayDefault