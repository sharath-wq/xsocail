import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = ({ data }: { data: any[] }) => {
    const formattedData = data.map((item) => ({
        name: item.name,
        user: item.user,
        posts: item.posts,
        userReport: item.userReport,
        postReport: item.postReport,
    }));

    return (
        <div className='h-[450px] bg-secondary p-5 rounded-xl'>
            <h2 className='font-extralight mb-5'>Weekly Recap</h2>
            <ResponsiveContainer width='100%' height='90%'>
                <LineChart
                    width={500}
                    height={300}
                    data={formattedData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip contentStyle={{ background: '#151c2c', border: 'none' }} />
                    <Legend />
                    <Line type='monotone' dataKey='user' stroke='#8884d8' strokeDasharray='5 5' />
                    <Line type='monotone' dataKey='posts' stroke='#82ca9d' strokeDasharray='3 4 5 2' />
                    <Line type='monotone' dataKey='userReport' stroke='#ffc658' strokeDasharray='2 2 6 2' />
                    <Line type='monotone' dataKey='postReport' stroke='#ff7300' strokeDasharray='1 2 3 4' />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;
