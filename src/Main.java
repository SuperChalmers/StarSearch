import simulation.SimulationSummary;
import simulation.SimulationSystem;

public class Main {

    public static void main(String[] args) throws Exception {
        if (args.length < 1) {
            System.out.println("ERROR: Test scenario file name not found.");
            return;
        }

        SimulationSystem simulation = FileProcessor.createSimulation(args[0]);
        SimulationSummary summary = simulation.runSimulation();
        System.out.println(String.valueOf(summary.getSizeOfRegion()) + ","
                + String.valueOf(summary.getNumberOfSafeSquares()) + ","
                + String.valueOf(summary.getNumberOfExploredSafeSquares())
                + "," + String.valueOf(summary.getNumberOfCompleteTurnsTaken()));

    }
}
