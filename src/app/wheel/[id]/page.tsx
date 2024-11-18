import WheelItem from "@/components/WheelItem";

export default function WheelDetail({ params }: { params: { id: string } }) {
    return <WheelItem id={params.id} />;
}
