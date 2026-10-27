import net from "node:net"

// Node tries each resolved IP for only 250ms by default, which is shorter than the
// round trip to Neon (us-east-2) from East Africa, so every connection times out.
net.setDefaultAutoSelectFamilyAttemptTimeout(10_000)
