<?php

namespace Meetanshi\ImageClean\Console;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Meetanshi\ImageClean\Helper\Data;

/**
 * Class CleanProductImage
 * @package Meetanshi\ImageClean\Console
 */
class CleanProductImage extends Command
{
    /**
     * @var Data
     */
    protected $helper;

    /**
     * CleanProductImage constructor.
     * @param Data $data
     */
    public function __construct(Data $data)
    {
        $this->helper = $data;
        parent::__construct($name = null);
    }

    /**
     *
     */
    protected function configure()
    {
        $this->setName('imageclean:product-image:clean');
        $this->setDescription('Clean Product Image(s)');
        parent::configure();
    }

    /**
     * @param InputInterface $input
     * @param OutputInterface $output
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->helper->ClearUnusedImages('product');
        $output->writeln("Product Image(s) was successfully cleaned");
    }
}