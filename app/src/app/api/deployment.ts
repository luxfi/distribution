import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// ISR to cache the response for 1 hour (3600 seconds)
export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const network = searchParams.get('network');
  const contract = searchParams.get('contract');

  if (!network || !contract) {
    return NextResponse.json({ error: 'Network or contract missing' }, { status: 400 });
  }

  try {
    // Attempt to load from local deployment files
    const deploymentPath = path.resolve(`./deployments/${network}/${contract}.json`);
    if (fs.existsSync(deploymentPath)) {
      const deployment = JSON.parse(fs.readFileSync(deploymentPath, 'utf8'));
      return NextResponse.json(deployment);
    } else {
      // Fallback to @luxfi/standard if local deployment is not found
      const dynamicDeployment = await import(`@luxfi/standard/deployments/${network}/${contract}.json`);
      return NextResponse.json(dynamicDeployment);
    }
  } catch (error) {
    console.error(`Error fetching deployment for ${contract} on ${network}:`, error);
    return NextResponse.json({ error: 'Deployment not found' }, { status: 404 });
  }
}
