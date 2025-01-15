import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/app/lib/mongodb';
import Agent from '@/app/models/agent';
import { signToken } from '@/app/lib/jwt';

export async function POST(req: Request) {
  console.log('Signup request received');
  try {
    await dbConnect();
    console.log('Connected to database');

    const { name, address, city, state, country, password, contact_number, email } = await req.json();
    console.log('Request body parsed');

    if (email) {
      const existingAgent = await Agent.findOne({ email });
      if (existingAgent) {
        console.log('Email already exists');
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    console.log('Hashing password');
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('Creating new agent');
    const newAgent = new Agent({
      name,
      address,
      city,
      state,
      country,
      password: hashedPassword,
      contact_number,
      email: email || null, // Allow null email
    });

    console.log('Saving new agent');
    await newAgent.save();
    console.log('New agent saved');

    const token = signToken({ id: newAgent._id });
    console.log('Token generated');

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Error in signup process:', error);
    return NextResponse.json({ error: 'Error creating user', details: error }, { status: 500 });
  }
}
