import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import Agent from '@/app/models/agent';
import { signToken } from '@/app/lib/jwt';

export async function POST(req: Request) {
  console.log('Login request received');
  try {
    await dbConnect();
    console.log('Connected to database');

    const { identifier, password } = await req.json(); // 'identifier' can be email or phone
    console.log('Request body parsed');

    const agent = await Agent.findOne({
      $or: [{ email: identifier }, { contact_number: identifier }],
    });

    if (!agent) {
      console.log('Agent not found');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    console.log('Agent found, comparing passwords');
    const isMatch = await bcrypt.compare(password, agent.password);

    if (!isMatch) {
      console.log('Password does not match');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 400 });
    }

    console.log('Password matched, generating token');
    const token = signToken({ id: agent._id });

    console.log('Login successful');
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error in login process:', error);
    return NextResponse.json(
      { error: 'Error logging in', details: error },
      { status: 500 }
    );
  }
}
