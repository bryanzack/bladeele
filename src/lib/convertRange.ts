type FParams = {
    old_value: number,
    old_min: number
    old_max: number,
    new_min: number,
    new_max: number,
}

export default function convertRange({params}: {params: FParams}) {
    const {
        old_value,
        old_min,
        old_max,
        new_min,
        new_max
    } = params;

    return (((old_value - old_min) * (new_max - new_min)) / (old_max - old_min)) + new_min;
}